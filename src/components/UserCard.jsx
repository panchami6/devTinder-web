const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          style={{
            backgroundColor: "#f0f0f0",
            width: "100%",
            height: "350px",
            objectFit: "cover",
          }}
          src={user.photoUrl}
          alt="profile"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.age}</p>
        <p>{user.gender}</p>
        <div className="card-actions justify-center">
          <button className="btn bg-gray-500">Ignore</button>
          <button className="btn btn-primary">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
