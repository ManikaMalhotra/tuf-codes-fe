import { CodeHighlight } from "@mantine/code-highlight";
import { formatSourceCode } from "../SubmissionsTable/SubmissionsTable.helpers";
import { useState } from "react";
import { Button, Modal } from "@mantine/core";
import { CodeModalProps } from "./CodeModal.types";

const CodeModal = ({ selectedRow, opened, close }: CodeModalProps) => {
  const [showMore, setShowMore] = useState(false);
  
  return (
      <Modal
        size="80%"
        withCloseButton
        opened={opened}
        onClose={close}
        title="Source Code"
      >
        {
          showMore
            ? <CodeHighlight
              language={selectedRow.codeLanguage}
              code={formatSourceCode(selectedRow.sourceCode)}
            /> 
            : <CodeHighlight
              language={selectedRow.codeLanguage}
              code={selectedRow.sourceCode.length > 100 ? formatSourceCode(selectedRow.sourceCode.substring(0, 100)) + '...' : formatSourceCode(selectedRow.sourceCode.substring(0, 100))}
            />
        }
        {
          selectedRow.sourceCode.length > 100 
            ? <Button 
                style={{ marginTop: '20px' }}
                onClick={() => setShowMore(!showMore)} 
                color='var(--primary-color)'>
                  {showMore ? 'Show less' : 'Show more'}
              </Button> 
            : <></>
        }
      </Modal>
  );
};

export default CodeModal;