# Visual Builder Hello World example

## How to use Visual Builder in SaaS

This is a Hello World example of the Optimizely Visual Builder
Ensure you have a running Optimizely CMS SaaS instance. For more information on saas [click here]("https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/overview-of-cms-saas")

If you have an empty CMS instance, and you just want to see how it all
works then go to your instance and:

1. Go to admin mode
2. Open content types list
3. Create a new `Element type`
4. Name it `ParagraphElement`
5. Add a single `Text` property of type XHTML string

Then in order to run the sample you need to do the following:

1. Clone this repository
2. Copy `Single key` from Optimizely CMS Dashboard
3. Put the key in .env.local file
4. Run `yarn codegen` to generate graphql queries
5. Run `yarn dev` to start the site

Create a new experience of `Blank Experience` type.

![adding experience](docs/create_experience.png)

Type in the name and hit `Create Experience`.

![creating experience](docs/create_experience_dialog.png)

If you would like to see the site preview in Edit Mode of your SaaS instance
you will need to configure it in `Settings`.

![websites list](docs/settings_sites.png)

Add a website like this:

![adding new website](docs/settings_site.png)

Now add a new section, row, column and an element of `Paragraph Type`.

Fill in the text `Hello world!` and you should see it in the preview.

![hello world](docs/hello_world.png)

## A detailed process of creating this sample Hello World app

All parts of this repository are described step by step so if you prefer to build stuff yourself
then please find the instructions below. 

### Prerequisites

We are going to create a simple Next.js app which will consume data from our SaaS instance

Let's create a new Next.js application based on the `hello world` example template
> npx create-next-app@latest vb-test --use-yarn --example hello-world vb-test

Let's add graphql support by installing the following dependencies:
> yarn add @apollo/client graphql

Now we need to install development tools which will generate objects based on your graphql schema.
> yarn add --dev @graphql-codegen/cli @graphql-codegen/client-preset @parcel/watcher

Now let's add a configuration file for the codegen plugin. Please create a new file in the root folder `codegen.ts` 
and paste the following code:

```ts
import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const graphSingleKey = process.env.GRAPH_SINGLE_KEY

const config : CodegenConfig = {
    schema: `https://staging.cg.optimizely.com/content/v2?auth=${graphSingleKey}`,
    documents: ["src/**/*.{ts,tsx}"],
    ignoreNoDocuments: true,
    generates: {
        './src/graphql/': {
            preset: 'client',
            plugins: [],
        }
    }
}

export default config
```

We now need to add a new script to package.json

> "codegen": "graphql-codegen --watch"

This script will generate types based your graphql schema.

### Adding element type 

Before we run the codegen let's add a simple Element type to our SaaS CMS instance. 
Please open `Settings` and `Content types` screen.

Click on `Create New...` menu item and choose `Element type` option.
![clicking add element type](docs/contenttype_add_elementtype.png)

Fill in the name and display name and hit the `Create` button.
![adding element name](docs/contenttype_add_elementtype_dialog.png)

You will see an empty list of properties, hit the `Add property` button and add a single `Text` `XHTML string` property:
![adding property](docs/contenttype_add_property.png)

After that you should see the newly created element type in the list.
![added element type](docs/contenttype_list.png)

### Graphql generation

Now let's go back to our Next.js application and let's try to run the codegen script.
First you will need to fill in your GRAPH_SINGLE_KEY into `.env.local` file (create it if it does not exist)

![fill GRAPH_SINGLE_KEY](docs/graph_single_key.png)

> yarn codegen

You should see that it successfully generated the schema to `src/graphql` folder:

![codegen result](docs/codegen_result.png)

After that `src/graphql` should contain a few files which will let you write graphql queries.

### Adding first element component

Let's create a new React component which will display our `ParagraphElement`.

The code will be something like this:

```tsx
import { FragmentType, useFragment } from '../../graphql/fragment-masking'
import { graphql } from '@/graphql'

export const ParagraphElementFragment = graphql(/* GraphQL */ `
    fragment paragraphElement on ParagraphElement {
        Text {
            html
        }
    }
`)

const ParagraphElementComponent = (props: {
    paragraphElement: FragmentType<typeof ParagraphElementFragment>
}) => {
    const paragraphElement = useFragment(ParagraphElementFragment, props.paragraphElement)
    // @ts-ignore
    return <div dangerouslySetInnerHTML={{ __html: paragraphElement.Text?.html }}></div>
}

export default ParagraphElementComponent
```

### Adding the layout component

Now we need the master component which will be responsible for rendering the layout (sections/row/columns):

```tsx
import React, { FC } from 'react'
import { useQuery } from '@apollo/client'

import { graphql } from '@/graphql'
import CompositionNodeComponent from './CompositionNodeComponent'

export const VisualBuilder = graphql(/* GraphQL */ `
query VisualBuilder($key: String, $version: String) {
  _Experience(where: { _metadata: { key: { eq: $key } version: { eq: $version } } }) {
    items {      
      composition {
            grids: nodes {
              ... on CompositionStructureNode {
                key
                rows: nodes {
                  ... on CompositionStructureNode {
                    key
                    columns: nodes {
                      ... on CompositionStructureNode {
                        key
                        elements: nodes {
                          ...compositionElementNode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
      _metadata {
        version        
      }
    }
  }
}
`)

interface VisualBuilderProps {
    version: string | null
}

const VisualBuilderComponent: FC<VisualBuilderProps> = ({ version }) => {
    const { data } = useQuery(VisualBuilder, { variables: { version } })

    return (
        <div className="relative w-full flex-1 vb:outline">
            {data?._Experience?.items?.map((experience: any) => (
                <div className="relative w-full flex-1 vb:outline">
                    {experience?.composition?.grids?.map((grid: any) =>
                        <div className="relative w-full flex flex-col flex-nowrap justify-start vb:grid"
                             data-epi-block-id={grid?.key}>
                            {grid.rows?.map((row: any) =>
                                <div
                                    className="flex-1 flex flex-row flex-nowrap justify-start vb:row">
                                    {row.columns?.map((column: any) => (
                                        <div
                                            className="flex-1 flex flex-col flex-nowrap justify-start vb:col">
                                            {column.elements?.map((element: any) =>
                                                <div
                                                    data-epi-block-id={element?.key}>
                                                    <CompositionNodeComponent
                                                        compositionElementNode={element}/>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default VisualBuilderComponent
```

It's basically a nested loop on a few levels. First we iterate over sections, then rows, then columns and finally elements.
We are wrapping each of those layout items into basic tailwind grid classes.

In this simple example there is just one element type but we don't want to hardcode anything so here is a pattern 
that you can use to use a different element component per `nodeType`:

```tsx
import { FragmentType, useFragment } from '../../graphql/fragment-masking'
import { graphql } from '@/graphql'
import ParagraphElementComponent from '../elements/ParagraphElementComponent'

export const CompositionElementNodeFragment = graphql(/* GraphQL */ `
    fragment compositionElementNode on CompositionElementNode {
        key
        element {
            _metadata {
                types
            }
            ...paragraphElement
        }
    }
`)

const CompositionElementNodeComponent = (props: {
    compositionElementNode: FragmentType<typeof CompositionElementNodeFragment>
}) => {
    const compositionElementNode = useFragment(CompositionElementNodeFragment, props.compositionElementNode)
    const element = compositionElementNode.element
    switch (element?.__typename) {
        case "ParagraphElement":
            return <ParagraphElementComponent paragraphElement={element}/>
        default:
            return <>NotImplementedException</>
    }
}

export default CompositionElementNodeComponent
```

As you can see based on `element.__typename` we can use different components - in our
example we will use `ParagraphElementComponent`.