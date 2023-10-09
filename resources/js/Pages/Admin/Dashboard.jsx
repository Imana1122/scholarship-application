import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';

export default function Dashboard(props){
  return (
    <AdminLayoutComponent currentUser={props.currentUser}>

      <h2>Dashboard</h2>


    </AdminLayoutComponent>
  );
}
