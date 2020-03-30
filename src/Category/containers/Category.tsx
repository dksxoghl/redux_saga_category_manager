import React, { useState, useEffect } from 'react';
import {
  Container,
  TitleBox,
  ContentBox,
  Title,
  UnderLine,
  AdminAddFormBox,
  AdminTableBox,
} from "./styles";

import SettingBox from './SettingBox';
import SettingRightBox from './SettingRightBox';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../modules'
import {  get_category, add_category, update_category, delete_category } from '../../modules/category';

interface IProps {
  submenu: string;
  selectedMenuId: string[];
}

const Category = () => {
  // const { submenu, selectedMenuId } = props;
  const [checkItem, setCheckItem] = useState({});
  const [checkParentItem, setCheckParentItem] = useState({});
  

  const {data,loading,error}=useSelector((state:RootState)=>state.category_reducer.category);
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_category());
    }, [dispatch]);
  if (loading) return <p>'Loading...'</p>;
  if (error) return(<p>Error! {data.message}</p>);
  if(!data) return null;
  // const categories = [{id:'a0',name:'대',parent_id:null,order:1,status:'show',active:true}];
  
  const onSave = (changedList) => {
    changedList.map(list => {
      dispatch(update_category(list));
        // dispatch(update_category({ id: list.id, name: list.name, parent_id: list.parent_id, order: list.order, status: list.status ,active:list.active}));
      });
    
   
    alert('저장이 완료 되었습니다.');
  }
  
  const changeRight=(item,parentItem)=>{
    setCheckItem(item);
    setCheckParentItem(parentItem);
  }

  return (
    <>
      <Container>
        <TitleBox>
          <Title>카테고리 관리</Title>
          <UnderLine />
        </TitleBox>
        <ContentBox>
          <AdminTableBox>
            {/* <AdminTable /> */}
            {/* <SettingContainer categories={categories} onChange={onChange} /> */}
            <SettingBox  onSave={onSave} changeRight={changeRight} />
           
          </AdminTableBox>
          <AdminAddFormBox>

          <SettingRightBox item={checkItem} checkParentItem={checkParentItem}/>
          
          </AdminAddFormBox>
        </ContentBox>
      </Container>
    </>
  );
}

export default Category;