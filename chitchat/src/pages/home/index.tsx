import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import styles from './index.module.css'
import { Search } from 'react-vant'
const Home = () => {
  useTitle('首页')
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/search')
  }
  return (
    <div>
      <Search placeholder="请输入内容" onClickInput={handleSearch} className='bg-inherit'/>
    </div>
  )
}

export default Home
