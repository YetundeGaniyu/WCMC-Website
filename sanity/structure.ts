import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Page Images')
        .icon(() => '🖼️')
        .child(
          S.document()
            .schemaType('pageImages')
            .documentId('pageImages')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(item => item.getId() !== 'pageImages')
    ])
