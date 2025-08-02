import styles from './index.module.css'
import { useState } from 'react';
import { Button, Input } from 'react-vant';
import { chat } from '../../llm';
import MarkdownRenderer from '../MarkdownRenderer';
import{memo} from 'react';


const ChatArea = ({prompt,placeholder}) => {
  // const { messagesList,loading, addMessage } = useChatAreaStore();
  const [inputValue, setInputValue]  = useState('');
  const [messagesList,setMessagesList] = useState<any>([{role:'system',content:prompt}]);
  const [loading,setLoading] = useState(false);
  const addMessage = (message : string, role: 'user' | 'assistant'|'system') => {
     setLoading(true);
     chat([...messagesList,{role,content:message}]).then(res => { 
       if(res.data) {
         setMessagesList([...messagesList,{role,content:message},{role:res.data.role,content:res.data.content}]);
         setLoading(false);
       }
     }) 
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(inputValue.trim() === '') {
      // Toast.fail('请输入内容');
      setInputValue('')
      return;
    }
    addMessage(inputValue, 'user');
    setInputValue('');
  }
  return(
    <div className={styles.chatArea}>
    <div className={styles.messagesContainer}>
      {messagesList.map((message, index) => (
        <div key={index} className={`${styles.message} ${message.role === 'user' ? styles.user : styles.assistant}`}>
          <div className={styles.avatar}>
            {message.role === 'user' ? 'U' : 'AI'}
          </div>
          <div className={styles.messageContent}>
            <MarkdownRenderer markdown={message.content}/>
          </div>
          
        </div>
      ))}
     
    </div>
    
    <div className={styles.inputContainer}>
      <form onSubmit={handleSubmit}> 
        <Input
          className={styles.input}
          placeholder={placeholder||"发消息给我吧"}
          value={inputValue}
          onChange={(value) => {setInputValue(value)}}
          autoFocus = {true}
          disabled={loading}
          
        />
        <Button 
          className={styles.sendButton}
          type="primary" 
          size="small" 
          nativeType="submit"
        >
          发送
        </Button>
      </form>
    </div>
  </div>
  )
}

export default memo(ChatArea)