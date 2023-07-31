import { GlobalContext, CartItemType } from "contexts/global";
import { useContext } from 'react';
import { Dropdown, List, Row, Col } from 'antd';
import styles from './index.module.scss';

const colProps = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 8 },
}

export default function CartDropDown() {

  const { globalState } = useContext(GlobalContext);
  const totalQty = () => {
    let total = 0;
    if(globalState.cartItems.length !== 0 ) {
      globalState.cartItems.forEach( (item:CartItemType) => total += item.qty)
    }
    return total;
  }

  return (
    <Dropdown
      placement="bottomRight"
      dropdownRender={(menu) => (
        <Row style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Col {...colProps} className={styles.listConatiner}>
            <List 
              itemLayout="horizontal"
              dataSource={globalState.cartItems}
              renderItem={(item: CartItemType) => (
                <List.Item key={item.product_id + item.size}>
                  <table>
                    <tbody>
                      <tr>
                        <td rowSpan={3} className={styles.imageTd}><img src={item.imageUrl} /></td>
                        <td>{item.title}</td>
                      </tr>
                      <tr>
                        <td>{item.qty} X <strong>${item.unit_price.toFixed(2)}</strong></td>
                      </tr>
                      <tr>
                        <td>Size: {item.size}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                </List.Item>
              )}
            />
          </Col>
        </Row>
      )}
      trigger={['click']}
    >
      <div>My Cart (<span>{totalQty()}</span>)</div>
    </Dropdown>
  )
}