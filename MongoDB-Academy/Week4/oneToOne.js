/*
 * Whether to embed documents or not

Consider a document of an employee, with an ID, name, and a resume list (to embed or not to embed);

1. Frequency of access
- If you are not accessing the resume list constantly, it might be better to keep it in a separate collection so that you don't pull it into memory every time you access the employee.

2. Size of items
- Growth. What's larger and what is being added on to more? (Ex. the employee document or the embedded resume document)
- 16 MB (size of document)

3. Atomicity of data
- Update all at once?
*/