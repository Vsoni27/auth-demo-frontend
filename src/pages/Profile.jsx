import React from 'react';
import { useProfileQuery } from '../../store';

const Profile = () => {

  const { data, isFetching, isError } = useProfileQuery();

  return (
    <div>Profile</div>
  )
}

export default Profile;

