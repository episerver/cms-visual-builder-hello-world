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
            {
                data?._Experience?.items?.map((experience: any) => {
                    return (
                        <div key="unstructuredData" className="relative w-full flex-1 vb:outline">
                            {
                                experience?.composition?.grids?.map((grid: any) => {
                                        if (grid?.__typename === "CompositionStructureNode") {
                                            return (
                                                <div
                                                    className="relative w-full flex flex-col flex-nowrap justify-start vb:grid"
                                                    data-epi-block-id={grid?.key}>
                                                    {
                                                        grid.rows?.map((row: any) => {
                                                                if (row?.__typename === "CompositionStructureNode") {
                                                                    return (
                                                                        <div
                                                                            className="flex-1 flex flex-row flex-nowrap justify-start vb:row">
                                                                            {
                                                                                row.columns?.map((column: any) => {
                                                                                    if (column?.__typename === "CompositionStructureNode") {
                                                                                        return (
                                                                                            <div
                                                                                                className="flex-1 flex flex-col flex-nowrap justify-start vb:col">
                                                                                                {
                                                                                                    column.elements?.map((element: any) => {
                                                                                                        if (element?.__typename === "CompositionElementNode") {
                                                                                                            return <div
                                                                                                                data-epi-block-id={element?.key}>
                                                                                                                <CompositionNodeComponent
                                                                                                                    compositionElementNode={element}/>
                                                                                                            </div>
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
                                                            }
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    }
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VisualBuilderComponent