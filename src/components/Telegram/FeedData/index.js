import { useEffect,useState } from 'react'
import db from '../../../firebase'

const FeedData = ({ thread,currentUser }) => {
  const [messagesRe, setMessagesRe] = useState([])
  const [messagesSe, setMessagesSe] = useState([])


  useEffect(() => {
    if (thread) {
      db
        .collection('users')
        .doc(thread.uid)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessagesSe(snapshot.docs.map((doc) => ({
            id: doc.id,
            data:doc.data(),
          })))
        )
    }
    if(currentUser){
      db
        .collection('users')
        .doc(currentUser?.uid)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessagesRe(snapshot.docs.map((doc) => ({
            id: doc.id,
            data:doc.data(),
          })))
        )}
  }, [thread, currentUser])
  const filterRe = messagesRe.filter((m) => m?.data?.uid === thread?.uid)
  const filterSe = messagesSe.filter((m) => m?.data?.uid=== currentUser?.uid)
  const messages = filterRe.concat(filterSe)
  messages.sort(function(a,b){return a.data?.timestamp - b.data?.timestamp})

  return (messages)
}

export default FeedData
