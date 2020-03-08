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

import SettingBox from './SettingContainer/SettingBox';
import SettingRightBox from './SettingRightContainer/SettingRightBox';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../modules'
import {  get_category, ADD_CATEGORY } from '../modules/category';

interface IProps {
  submenu: string;
  selectedMenuId: string[];
}

const Category = () => {
  // const { submenu, selectedMenuId } = props;
  const [checkItem, setCheckItem] = useState({});
  const [checkParentItem, setCheckParentItem] = useState({});
  
  const [active, setActive] = useState({
    id:"", active:false
  });
  const [handleName, setHandleName] = useState({
    id:"", name:"",parent_id:""
  });
  const {data,loading,error}=useSelector((state:RootState)=>state.category_reducer.category);
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_category());
    }, [dispatch]);
  if (loading) return <p>'Loading...'</p>;
  if (error) return(<p>Error! {data.message}</p>);
  if(!data) return null;
  // const categories = [{id:'a0',name:'대',parent_id:null,order:1,status:'show',active:true}];
  
  const onSave = (changedList, deleteId,insertId) => {
    console.log(changedList, deleteId,insertId);
    let newInsertId=insertId.slice(1,insertId.length);
    console.log(newInsertId);
    let insertList=newInsertId.map(id=>{
     return changedList.filter(item=>item.id===id);
    })
    console.log(insertList);
    insertList.map(list =>  dispatch({type:ADD_CATEGORY,payload:{ id: list[0].id, name: list[0].name, parent_id: list[0].parent_id, order: list[0].order, status: list[0].status,active:list[0].active }})  );
    // insertList.map(list => insert({ variables: { id: list[0].id, name: list[0].name, parent_id: list[0].parent_id, order: list[0].order, status: list[0].status,active:list[0].active } }))
    // deleteId.map(id => erase({ variables: { id: id } }));
    // // if (deleteId.length === 1 && changedList.length === categories.length) {
    // changedList.map(list => {
    //   save({ variables: { id: list.id, name: list.name, parent_id: list.parent_id, order: list.order, status: list.status ,active:list.active} })
    // });
    // } else if (changedList.length > data.categories2.length) {

    // } else {
    //   changedList.map(list => {
    //     save({ variables: { id: list.id, name: list.name, parent_id: list.parent_id, order: list.order } })
    //   });
    // }
    // id.map(id=>  save({ variables: { id: id } }));
    alert('저장이 완료 되었습니다.');
  }
  
  const changeRight=(item,parentItem)=>{
    setCheckItem(item);
    setCheckParentItem(parentItem);
  }
  const changeActive=(active,id)=>{
    console.log(active)
    setActive({active:active,id});
  };
  const changeName=(name,id,parent_id)=>{
    setHandleName({
      id,name,parent_id
    })
  };
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
            <SettingBox categories={data} onSave={onSave} changeRight={changeRight} active={active} handleName={handleName}/>
           
          </AdminTableBox>
          <AdminAddFormBox>

          <SettingRightBox item={checkItem} changeActive={changeActive} changeName={changeName} checkParentItem={checkParentItem}/>
          
          </AdminAddFormBox>
        </ContentBox>
      </Container>
    </>
  );
}

export default Category;