import { Page } from "../../../components/Page";

export const ManageCounsellingPage = () => {

  return (
    <Page title={'Manage Counselling'} breadcrumbs={[
      { title: 'Settings', link: '/settings' },
      { title: 'Manage Counselling' },
    ]}>
    </Page>
  );
};
