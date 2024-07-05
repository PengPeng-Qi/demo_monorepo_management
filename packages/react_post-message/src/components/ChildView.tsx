import { useEffect, useRef } from 'react'

function ChildView() {
  const myRef = useRef<HTMLIFrameElement>(null)

  // 使用 useEffect 来添加和移除事件监听器
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'http://localhost:5173') {
        alert('Received message from parent: ' + event.data)
      }
    }

    window.addEventListener('message', handleMessage)

    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const sendMessage = () => {
    if (myRef.current && myRef.current.contentWindow) {
      myRef.current.contentWindow.postMessage(
        'Hello from child page!',
        'http://localhost:5173'
      )
    }
  }

  return (
    <>
      <h1>Child Page</h1>

      <iframe
        ref={myRef}
        src="http://localhost:5173"
        style={{ width: '600px', height: '400px', display: 'none' }}
      ></iframe>

      <button onClick={sendMessage}>Send Message to Parent</button>
    </>
  )
}

export default ChildView
