/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment compositionElementNode on CompositionElementNode {\n        key\n        element {\n            _metadata {\n                types\n            }\n            ...paragraphElement\n        }\n    }\n": types.CompositionElementNodeFragmentDoc,
    "\nquery VisualBuilder($key: String, $version: String) {\n  _Experience(where: { _metadata: { key: { eq: $key } version: { eq: $version } } }) {\n    items {      \n      composition {\n            grids: nodes {\n              ... on CompositionStructureNode {\n                key\n                rows: nodes {\n                  ... on CompositionStructureNode {\n                    key\n                    columns: nodes {\n                      ... on CompositionStructureNode {\n                        key\n                        nodes {\n                          displayTemplateKey\n                          key\n                          displayName\n                          nodeType\n                          type                          \n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n      _metadata {\n        version        \n      }\n    }\n  }\n}\n": types.VisualBuilderDocument,
    "\n    fragment paragraphElement on ParagraphElement {\n        html {\n            html\n        }\n    }\n": types.ParagraphElementFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment compositionElementNode on CompositionElementNode {\n        key\n        element {\n            _metadata {\n                types\n            }\n            ...paragraphElement\n        }\n    }\n"): (typeof documents)["\n    fragment compositionElementNode on CompositionElementNode {\n        key\n        element {\n            _metadata {\n                types\n            }\n            ...paragraphElement\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery VisualBuilder($key: String, $version: String) {\n  _Experience(where: { _metadata: { key: { eq: $key } version: { eq: $version } } }) {\n    items {      \n      composition {\n            grids: nodes {\n              ... on CompositionStructureNode {\n                key\n                rows: nodes {\n                  ... on CompositionStructureNode {\n                    key\n                    columns: nodes {\n                      ... on CompositionStructureNode {\n                        key\n                        nodes {\n                          displayTemplateKey\n                          key\n                          displayName\n                          nodeType\n                          type                          \n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n      _metadata {\n        version        \n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery VisualBuilder($key: String, $version: String) {\n  _Experience(where: { _metadata: { key: { eq: $key } version: { eq: $version } } }) {\n    items {      \n      composition {\n            grids: nodes {\n              ... on CompositionStructureNode {\n                key\n                rows: nodes {\n                  ... on CompositionStructureNode {\n                    key\n                    columns: nodes {\n                      ... on CompositionStructureNode {\n                        key\n                        nodes {\n                          displayTemplateKey\n                          key\n                          displayName\n                          nodeType\n                          type                          \n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n      _metadata {\n        version        \n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment paragraphElement on ParagraphElement {\n        html {\n            html\n        }\n    }\n"): (typeof documents)["\n    fragment paragraphElement on ParagraphElement {\n        html {\n            html\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;