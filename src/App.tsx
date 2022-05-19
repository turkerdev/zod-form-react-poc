import { Input, TInput } from "../lib/validation";
import { useZodForm } from "../lib/useZodForm";

function App() {
  const { formbody, formerror, setFormBody, editFormBody } = useZodForm(Input, {
    adminKey: "asd",
  });

  function testIt() {
    testFunction(formbody as TInput); // How can i handle this?
  }

  function testFunction({ adminKey, content, preview, title }: TInput) {
    console.log(adminKey, content, preview, title);
  }

  return (
    <div>
      <div>
        <button onClick={() => testIt()}>Click</button>
        <br />
        <input
          type="text"
          placeholder="title"
          onChange={(e) => editFormBody("title", e.target.value)}
        />
        {formerror?.title?._errors.map((err) => (
          <p>{err}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="content"
          onChange={(e) => editFormBody("content", e.target.value)}
        />
        {formerror?.content?._errors.map((err) => (
          <p>{err}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="preview"
          onChange={(e) =>
            setFormBody((body) => ({ ...body, preview: e.target.value }))
          }
        />
        {formerror?.preview?._errors.map((err) => (
          <p>{err}</p>
        ))}
      </div>
      <hr />
      <pre>{JSON.stringify(formbody, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(formerror, null, 2)}</pre>
    </div>
  );
}

export default App;
