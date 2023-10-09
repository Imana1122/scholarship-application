import React from 'react';
import { SchoolLayoutComponent } from '../../components/pagelayouts/SchoolLayoutComponent';

export default function Dashboard(props){
  return (
    <SchoolLayoutComponent currentUser={props.currentUser}>
      
      <h2>Dashboard</h2>


    </SchoolLayoutComponent>
  );
}
