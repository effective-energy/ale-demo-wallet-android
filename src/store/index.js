import WalletsStore from './WalletsStore';
import UserStore from './UserStore';
import TransactionsStore from './TransactionsStore';
import NotificationsStore from './NotificationsStore';

export default {
  walletsStore: new WalletsStore(),
  userStore: new UserStore(),
  transactionsStore: new TransactionsStore(),
  notificationsStore: new NotificationsStore(),
};