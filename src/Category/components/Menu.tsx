import React from 'react';
import FirstItem from './Item';
import { Line } from './styles';

function FirstMenu({ categories, ...args }) {
 
    return (
        categories.map(item => {
            if (item.status === "show") {
                let imgStatus='0';                      
                categories.map(list=>{
                    if(list.parent_id===item.id) imgStatus='+';         //자식이 하나라도 있으면 +이미지  없으면 0이미지
                });
                // onAdd={onAdd} onRemove={onRemove} onHide={onHide} orderChange={orderChange}
                // addSub={addSub} subMenu={subMenu} changeRight={changeRight} current={current} setCurrent={setCurrent} 
                return <div key={item.id}><Line/><FirstItem item={item}
                   imgStatus={imgStatus} categories={categories} {...args}/></div>
            }
        }
        )
      
    )

}

export default FirstMenu;