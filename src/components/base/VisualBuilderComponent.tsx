import React, { FC } from 'react'
import { useQuery } from '@apollo/client'

import { graphql } from '@/graphql'
import CompositionNodeComponent from './CompositionNodeComponent'

export const VisualBuilder = graphql(/* GraphQL */ `
query VisualBuilder($key: String, $version: String) {
  _Experience(where: {
      _metadata: { key: { eq: $key } }
      _or: { _metadata: { version: { eq: $version } } }
    }) {
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
        key
        version,        
      }
    }
  }
}
`)

interface VisualBuilderProps {
    key?: string;
    version?: string;
}

const VisualBuilderComponent: FC<VisualBuilderProps> = ({ key, version }) => {
    const variables: Record<string, unknown> = {};
    if (version) {
        variables.version = version;
    }

    if (key) {
        variables.key = key;
    }

    const { data } = useQuery(VisualBuilder, { variables: variables })

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