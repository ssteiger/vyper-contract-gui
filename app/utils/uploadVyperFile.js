export default async function uploadVyperFile (file: File) {
  const fileName = file.path.slice(file.path.lastIndexOf('/') + 1)

  const fileContent = await fetch(file.path).then(response => response.text())

  file.addedOn = new Date()
  file.content = fileContent
  file.deployedAt = {
    addresses: [],
    selected: {}
  }
  console.log(file)

  return file
}
