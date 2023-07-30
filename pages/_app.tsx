import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { Layout, Space } from 'antd';

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  marginTop: 20,
  height: 32,
  lineHeight: '32px',
  backgroundColor: '#F6F6F7'
};

const contentStyle: React.CSSProperties = {
  padding: 10,
  backgroundColor: '#FFF',
};

export default function MyApp({ Component, pageProps }: AppProps) {
  
  return <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Header style={headerStyle}></Header>
            <Content style={contentStyle} >
              <Component {...pageProps} />
            </Content>  
          </Space>    
}
