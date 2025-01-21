import { FragmentType, useFragment } from '../../graphql/fragment-masking'
import { graphql } from '@/graphql'
import ParagraphElementComponent from '../elements/ParagraphElementComponent'

export const CompositionComponentNodeFragment = graphql(/* GraphQL */ `
    fragment compositionComponentNode on CompositionComponentNode {
        key
        component {
            _metadata {
                types
            }
            ...paragraphElement
        }
    }
`)

const CompositionComponentNodeComponent = (props: {
    compositionComponentNode: FragmentType<typeof CompositionComponentNodeFragment>
}) => {
    const compositionComponentNode = useFragment(CompositionComponentNodeFragment, props.compositionComponentNode)
    const component = compositionComponentNode.component
    switch (component?.__typename) {
        case "ParagraphElement":
            return <ParagraphElementComponent paragraphElement={component}/>
        default:
            return <>NotImplementedException</>
    }
}

export default CompositionComponentNodeComponent