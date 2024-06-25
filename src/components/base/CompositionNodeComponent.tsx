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
    return JSON.stringify(compositionElementNode);
    // const element = compositionElementNode.element
    // return JSON.stringify(element);
    // switch(element?.__typename)
    // {
    //     case "ParagraphElement":
    //         return <div data-epi-block-id={compositionElementNode.key}><ParagraphElementComponent paragraphElement={element} /></div>
    //     default:
    //         return JSON.stringify(element)
    //         // return <>NotImplementedException</>
    // }
}
 
export default CompositionElementNodeComponent