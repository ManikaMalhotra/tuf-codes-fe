import { TextInput, NativeSelect, Textarea, Group, Flex, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { validateFormFields } from "./LandingPage.helpers";

const LandingPage = () => {
  const router = useRouter();
  
  const [ username, setUsername ] = useState("");
  const [ codeLanguage, setCodeLanguage ] = useState("C++");
  const [ stdin, setStdin ] = useState("");
  const [ sourceCode, setSourceCode ] = useState("");
  const [ validationError, setValidationError ] = useState("");
  const [ isButtonClicked, setIsButtonClicked ] = useState(false);
  
  const handleSubmit = () => {
    const validationError = validateFormFields(username, codeLanguage, stdin, sourceCode);

    if (validationError) {
      setValidationError(validationError);
      return;
    }

    setIsButtonClicked(true);

    fetch("https://tufcodes.onrender.com/form/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        codeLanguage,
        standardInput: stdin,
        sourceCode,
        submissionTimestamp: new Date().toISOString()
      })
    })
    .then(() => {
      setIsButtonClicked(false);
      router.push("/submissions");
    })
    .catch(() => {
      setIsButtonClicked(false);
      setValidationError("An error occurred while submitting the form. Please try again.");
    });
  };
  
  return (
    <div style={{ marginTop: "60px" }}>
      <h1 style={{ textAlign: "center" }}>
        Welcome to tufCodes
      </h1>
      <Group>
        <Flex 
          justify="center" 
          direction="column" 
          align="center"
          style={{ width: "100%" }}
          gap={10}
        >
        <TextInput 
          onChange={(event) => setUsername(event.currentTarget.value)}
          label="Username" 
          style={{ width: "75%" }} 
          required 
        />
        <NativeSelect 
          label="Preferred code language" 
          style={{ width: "75%" }} 
          onClick={(event) => setCodeLanguage(event.currentTarget.value)}
          required
        >
          <option 
            style={{ width: "75%" }}  
            value="C++" 
          >
            C++
          </option>
          <option 
            style={{ width: "75%" }}  
            value="Java"
          >
            Java
          </option>
          <option 
            style={{ width: "75%" }}  
            value="JavaScript"
          >
            JavaScript
          </option>
          <option 
            style={{ width: "75%" }}  
            value="Python"
          >
            Python
          </option>
        </NativeSelect>
        <Textarea 
          onChange={(event) => setStdin(event.currentTarget.value)}
          label="Standard input (stdin)" 
          style={{ width: "75%" }} 
          required 
        />
        <Textarea 
          onChange={(event) => setSourceCode(event.currentTarget.value)}
          label="Source code" 
          style={{ width: "75%" }} 
          required 
        />
        <div style={{ width: "75%", textAlign: "center", color: "red" }}>
          {validationError}
        </div>
        <Button disabled={isButtonClicked} onClick={handleSubmit} variant="filled" color="red">Submit</Button>
        </Flex>
      </Group>
    </div>
  );
};

export default LandingPage;