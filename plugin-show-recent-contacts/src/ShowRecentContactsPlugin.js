import React from 'react';
import { View } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import RecentContactsView from './components/RecentContactsView';
import RecentContactsSidebarButton from './components/RecentContactsSidebarButton';

//import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
//import reducers, { namespace } from './states';

const PLUGIN_NAME = 'ShowRecentContactsPlugin';

export default class ShowRecentContactsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.SideNav.Content.add(
      <RecentContactsSidebarButton key="recent-contacts-button" />
    );

    flex.ViewCollection.Content.add(
      <View name="recent-contacts" key="recent-contacts">
        <RecentContactsView />
      </View>
    );
  }
}
