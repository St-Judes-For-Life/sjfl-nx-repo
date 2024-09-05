import { Page } from "../../../components/Page";

export const ManageApproversPage = () => {

  return (
    <Page title={'Manage Approvers'} breadcrumbs={[
      { title: 'Settings', link: '/settings' },
      { title: 'Manage Approvers' },
    ]}>
    </Page>
  );
};
