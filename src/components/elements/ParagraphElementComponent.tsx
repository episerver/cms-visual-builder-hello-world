import { FragmentType, useFragment } from '../../graphql/fragment-masking'
import { graphql } from '@/graphql'
import parse from 'html-react-parser';
 
export const ParagraphElementFragment = graphql(/* GraphQL */ `
    fragment paragraphElement on ParagraphElement {
        html {
            html
        }
    }
`)
 
const ParagraphElementComponent = (props: {
    paragraphElement: FragmentType<typeof ParagraphElementFragment>
}) => {
    const paragraphElement = useFragment(ParagraphElementFragment, props.paragraphElement)
    return <div>{ parse(paragraphElement.html ?? '') }</div>
}
 
export default ParagraphElementComponent