This is a Hello World example of the Optimizely Visual Builder

If you have an empty CMS instance and you just want to see how it all
works then go to your instance and:

1. Go to admin mode
2. Open content types list
3. Create a new `Element type`
4. Name it `ParagraphElement`
5. Add a single `html` property of type XHTML string

In order to run the sample you need to do the following:

1. Copy `Single key` from Optimizely CMS Dashboard
2. Run `yarn codegen` to generate graphql queries
3. Run `yarn dev` to start the site