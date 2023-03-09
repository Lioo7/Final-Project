import { Helmet } from 'react-helmet-async';
// import VotingForm from '../sections/vote/VotingForm';
import ParentTable from '../sections/vote/ParentTable';

export default function VotingPage() {
  return (
    <>
      <Helmet>
        <title> Voting </title>
      </Helmet>

      <ParentTable />
    </>
  );
}
