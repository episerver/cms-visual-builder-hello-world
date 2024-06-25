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
                        nodes {
                          displayTemplateKey
                          key
                          displayName
                          nodeType
                          type                          
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
            {
                data?._Experience?.items?.map((experience) => {
                    return (
                        <div key="unstructuredData" className="relative w-full flex-1 vb:outline">
                            {
                                experience?.composition?.grids?.map((grid) => {
                                    if (grid?.__typename === "CompositionStructureNode") {
                                        return (
                                            <div
                                                className="relative w-full flex flex-col flex-nowrap justify-start vb:grid"
                                                data-epi-block-id={grid?.key}>
                                                {
                                                    grid.rows?.map((row) => {
                                                        if (row?.__typename === "CompositionStructureNode") {
                                                            return (
                                                                <div
                                                                    className="flex-1 flex flex-row flex-nowrap justify-start vb:row">
                                                                    {
                                                                        row.columns?.map((column) => {
                                                                            if (column?.__typename === "CompositionStructureNode") {
                                                                                return (
                                                                                    <div
                                                                                        className="flex-1 flex flex-col flex-nowrap justify-start vb:col">
                                                                                        {
                                                                                            column.nodes?.map((node) => {
                                                                                                if (node?.__typename === "CompositionElementNode") {
                                                                                                    return <CompositionNodeComponent
                                                                                                        compositionElementNode={node}/>
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VisualBuilderComponent