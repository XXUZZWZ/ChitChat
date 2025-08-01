import styles from './index.module.css'
import useChatAreaStore from '../../store/useChatAreaStore'
import { useState } from 'react';
import { Button, Input } from 'react-vant';

const ChatArea = () => {
  const { messagesList, addMessage } = useChatAreaStore();
  const [inputValue, setInputValue]  = useState('');
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
            {message.message}
          </div>
        </div>
      ))}
    </div>
    
    <div className={styles.inputContainer}>
      <form onSubmit={handleSubmit}> 
        <Input
          className={styles.input}
          placeholder={"Message 诗司, replied by AI"}
          value={inputValue}
          onChange={(value) => {setInputValue(value)}}
          autoFocus = {true}
          autoSize = {
            {
              maxHeight: 100, minHeight: 50 
            }
          }
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

export default ChatArea