import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPostsPage } from './category-posts';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CategoryPostsPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPostsPage),
    ComponentsModule
  ],
})
export class CategoryPostsPageModule {}
