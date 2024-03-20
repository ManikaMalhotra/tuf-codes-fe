import { TextInput, NativeSelect, Textarea, Group, Flex, Button } from "@mantine/core";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();
  
  const handleSubmit = () => {
    router.push("/submissions");
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
          label="Username" 
          style={{ width: "75%" }} 
          required 
        />
        <NativeSelect 
          label="Preferred code language" 
          style={{ width: "75%" }} 
          required
        >
          <option style={{ width: "75%" }}  value="C++">C++</option>
          <option style={{ width: "75%" }}  value="Java">Java</option>
          <option style={{ width: "75%" }}  value="JavaScript">JavaScript</option>
          <option style={{ width: "75%" }}  value="Python">Python</option>
        </NativeSelect>
        <Textarea 
          label="Standard input (stdin)" 
          style={{ width: "75%" }} 
          required 
        />
        <Textarea 
          label="Source code" 
          style={{ width: "75%" }} 
          required 
        />
        <Button onClick={handleSubmit} variant="filled" color="red">Submit</Button>
        </Flex>
      </Group>
    </div>
  );
};

export default LandingPage;