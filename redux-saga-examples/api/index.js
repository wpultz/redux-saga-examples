export const fetchRandomWord = () => {
  return fetch('http://www.setgetgo.com/randomword/get.php')
    .then(resp => resp.text())
}


export const fetchDefinition = word => {
  return fetch('/definition/' + word)
    .then(resp => resp.text())
    .then(txtResp => {
      const parsedResponse = JSON.parse(txtResp)

      // this is intentionally lax in it's validation. if we can't get that data out of the response, let the catch
      // pick up the exception further up the stack
      return parsedResponse.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
    })
}
