// @flow
export default async function fetchFile (file: File) {
  const content = await fetch(file.path).then(response => response.text())

  return {
    name: file.name,
    path: file.path,
    addedOn: new Date(),
    content,
    deployedAt: {
      addresses: [],
      selected: {},
    }
  }
}
