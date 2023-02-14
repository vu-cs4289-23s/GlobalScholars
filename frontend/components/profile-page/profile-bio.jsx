const ProfileBio = ({ username, email, first_name, last_name, city }) => {
  return (
    <div>
      {username} {email} {first_name} {last_name} {city}
    </div>
  );
};

export default ProfileBio;
