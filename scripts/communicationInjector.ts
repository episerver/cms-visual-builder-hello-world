// @ts-expect-error
import domtoimage from "dom-to-image-more";
import html2canvas from "html2canvas-pro";
import hash from "object-hash";

import { buildFullReloadPropertyCollection, buildPropertyCollection, getBlockNodes } from "./build-property-collection";

interface EventHandle {
  remove: () => void;
}

// @ts-ignore
window.html2canvas = html2canvas;

const on = (target: Node, eventType: string, listener: any, capture = false) => {
  // summary:
  //      Simple event handler registration. Returns a handle with a remove method.
  // target: Object
  //      the object to listen for events on. Must implement addEventListener.
  // eventType: String
  //      The message payload to send to the topic listeners
  // listener: function
  //      The function to execute when the event is triggered

  const resolvedCapture = !!capture;

  target.addEventListener(eventType, listener, resolvedCapture);

  return {
    remove: function () {
      target.removeEventListener(eventType, listener, resolvedCapture);
      // @ts-ignore
      target = eventType = listener = capture = null;
    },
  };
};

(function (scope: any, global: any) {
  // summary:
  //      Handles integration between site content in preview and the edit UI.
  // tags:
  //      private

  /* global self: true */

  let keyPrefix = "epi::",
    messageHandlers: any = {},
    eventHandles: EventHandle[] = [],
    name = scope.name || "";

  function publish(topic: string, message: any) {
    // summary:
    //      Publishes a message using the postMessage hub.
    // topic: String
    //      The name of the topic to publish to
    // message: Object
    //      The message payload to send to the the topic listeners

    global.postMessage({ id: name + topic, message: message }, "*");
  }

  function subscribe(topic: string, handler: any) {
    // summary:
    //      Subscribes to a message on the postMessage hub.
    // topic: String
    //      The topic to subscribe to
    // handler: Function
    //      A function to call when a message is published to the given topic

    let key = keyPrefix + topic;

    messageHandlers[key] ? messageHandlers[key].push(handler) : (messageHandlers[key] = [handler]);

    return {
      remove: function () {
        let i,
          topicHandlers = messageHandlers[key];

        if (topicHandlers) {
          while ((i = topicHandlers.indexOf(handler)) !== -1) {
            topicHandlers.splice(i, 1);
          }
        }
        // @ts-ignore
        topic = handler = key = null;
      },
    };
  }

  function ready(fn: () => void) {
    // summary:
    //      Executes the provided function when the dom is ready.
    // fn: function
    //      The callback to execute when the dom is ready.

    let loadHandle: any;

    if (!fn) {
      return;
    }

    function load() {
      if (scope.document.readyState === "complete") {
        loadHandle.remove();
        fn();
        // @ts-ignore
        loadHandle = fn = null;
      }
    }

    if (scope.document.readyState === "complete") {
      fn();
    } else {
      loadHandle = on(scope.document, "readystatechange", load);
    }
  }

  function destroy() {
    eventHandles.forEach(function (handle) {
      handle.remove();
    });

    delete scope.epi.publish;
    delete scope.epi.subscribe;
    delete scope.epi.isEditable;
    delete scope.epi.ready;

    // @ts-ignore
    scope = global = messageHandlers = eventHandles = null;
  }

  function initSizeListener() {
    let size: any;

    function getElement(): HTMLElement | null {
      let doc = scope.document,
        elm = doc.getElementById("epi-bodysize");

      if (elm) {
        if (doc.body.lastChild === elm) {
          return elm;
        }
        if (elm.parentNode) {
          elm.parentNode.removeChild(elm);
        }
        elm = null;
      }

      doc.body.style.overflow = "hidden";
      doc.body.insertAdjacentHTML(
        "beforeend",
        "<div id='epi-bodysize' style='position: absolute; padding: 0; margin: 0;height: 0; width: 100%;'></div>"
      );
      return doc.getElementById("epi-bodysize");
    }

    function sizeChecker() {
      const elm = getElement();
      if (!elm) {
        return;
      }
      const w = elm.offsetWidth;
      const h = elm.offsetTop;

      if (!size || size.w !== w || size.h !== h) {
        size = { h: h, w: w };
        // include new size of properties when size has changed.
        size.properties = buildPropertyCollection();
        publish("/site/resize", size);
      }
    }

    function getScreenshot({ elementId, eventId }: any) {
      let options;
      let element;
      if (elementId) {
        element = document.querySelector(`[data-epi-block-id='${elementId}']`)!;
        const elementSize = element.getBoundingClientRect();
        options = {
          height: Math.min(elementSize.height, 720),
          width: elementSize.width,
          x: elementSize.left,
          y: elementSize.top,
        };
      } else {
        element = document.body;
        options = {
          windowWidth: 1280,
          windowHeight: 720,
          width: 1280,
          height: 720,
        };
      }

      const originalHeight = window.innerHeight;
      window.innerHeight = 100;
      html2canvas(document.body, { ...options, useCORS: true, allowTaint: true, logging: true })
        .then((canvas: HTMLCanvasElement) => {
          publish("/screenshot", { thumbnailDataUrl: canvas.toDataURL(), eventId });
        })
        .catch((error) => {
          domtoimage
            .toPng(element, {
              bgcolor: window.getComputedStyle(document.body, null).getPropertyValue("background-color"),
            })
            .then((dataUrl: any) => {
              publish("/screenshot", { thumbnailDataUrl: dataUrl, eventId });
            })
            .catch(() => {
              publish("/screenshot", { thumbnailDataUrl: null, eventId, error: error });
            });
        })
        .finally(() => {
          window.innerHeight = originalHeight;
        });
    }

    eventHandles.push(subscribe("/site/checksize", sizeChecker));
    eventHandles.push(subscribe("/screenshot", getScreenshot));
  }

  function initContentSavedDataListener() {
    function onContentSaved(message: any) {
      // we don't want consumer to receive that property as it is internal
      if (message.hasOwnProperty("isIndexed")) {
        delete message.isIndexed;
      }

      const contentSavedEvent = new CustomEvent("optimizely:cms:contentSaved", {
        detail: message,
      });
      window.dispatchEvent(contentSavedEvent);
    }

    eventHandles.push(subscribe("contentSaved", onContentSaved));
  }

  function thumbnailsSyncListeners() {
    eventHandles.push(
      subscribe("LastFileUploadedAndReplaced", function () {
        scope.document.querySelectorAll("img").forEach((img: HTMLImageElement) => {
          if (!img.src) {
            return;
          }

          img.src = img.src + "#" + new Date().getTime();
        });
      })
    );
  }

  // The user profile is not available in this context, so we just scope to `epi`.
  function initData() {
    const exports = (scope.epi = scope.epi || {});

    exports.isEditable = false;
    exports.ready = false;

    function setProperties(initialData: any) {
      exports.isEditable = initialData.isEditable;
      exports.ready = true;

      if (initialData.isEditable) {
        initContentSavedDataListener();
      }
    }

    eventHandles.push(subscribe("epiReady", setProperties));
    thumbnailsSyncListeners();
  }

  function initMessageHandler() {
    function handleMessage(msg: any) {
      let handlers,
        msgData = msg.data;

      if (msgData && msgData.id) {
        handlers = messageHandlers[keyPrefix + msgData.id];

        handlers &&
          handlers.forEach(function (handler: any) {
            try {
              handler(msgData.data);
            } catch (ex) {
              // eslint-disable-line no-empty
            }
          });

        msgData = null;
      }
    }

    eventHandles.push(on(scope, "message", handleMessage));
  }

  function exposeMethods() {
    const exports = (scope.epi = scope.epi || {});

    exports.publish = publish;
    exports.subscribe = subscribe;
  }

  let _lastPropertiesCollection = "_";

  function publishPropertiesEventIfNeeded() {
    const properties = buildPropertyCollection();
    const currentProperties = hash(properties);
    if (_lastPropertiesCollection === currentProperties) {
      return;
    }
    _lastPropertiesCollection = currentProperties;

    const fullReloadProperties = buildFullReloadPropertyCollection();
    publish("/site/properties", {
      properties: properties,
      clientHeight: scope.document.body.clientHeight,
      fullReloadProperties: fullReloadProperties,
    });
  }

  function publishBlocksInfoEvent() {
    publish("/site/blocks", {
      blockNodes: getBlockNodes(scope.document.body),
      clientHeight: scope.document.body.clientHeight,
    });
  }

  function setupObserver() {
    let deferredHandle: any | null = null;

    const targetNode = scope.document.body;
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function () {
      if (deferredHandle) {
        clearTimeout(deferredHandle);
      }
      deferredHandle = setTimeout(() => {
        publishPropertiesEventIfNeeded();
        publishBlocksInfoEvent();
      }, 500);
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    // resize observer
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(targetNode);
  }

  ready(function () {
    let message = { url: scope.location.href };

    initMessageHandler();
    initSizeListener();
    initData();
    exposeMethods();

    eventHandles.push(
      on(scope, "unload", function () {
        publish("/site/unload", message);
        destroy();
        // @ts-ignore
        message = null;
      })
    );

    eventHandles.push(
      on(scope, "mouseup", function () {
        publish("/site/mouseup", message);
      })
    );

    publish("/site/load", message);
    // Collect metadata about all the properties and publish it so that Edit view can build a copy based upon this metadata
    publishPropertiesEventIfNeeded();
    publishBlocksInfoEvent();
  });

  setTimeout(() => {
    setupObserver();
  }, 0);
})(self, top);
