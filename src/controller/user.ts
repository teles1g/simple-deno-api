import { InterfaceUser } from '../model/user.ts';

let users: Array<InterfaceUser> = [{
  id: '1',
  name: 'Steve Wozniak',
  email: 'woz@deno.com',
  created_at: new Date('2020-05-23'),
  updated_at: new Date('2020-05-23'), 
}, {
  id: '2',
  name: 'Steve Jobs',
  email: 'jobs@deno.com',
  created_at: new Date('2020-05-23'),
  updated_at: new Date('2020-05-23'), 
}, {
  id: '3',
  name: 'Elon Musk',
  email: 'musk@deno.com',
  created_at: new Date('2020-05-23'),
  updated_at: new Date('2020-05-23'), 
}, {
  id: '4',
  name: 'Bill Gates',
  email: 'gates@deno.com',
  created_at: new Date('2020-05-23'),
  updated_at: new Date('2020-05-23'), 
}];

const getUsers = ({ response }: { response: any }) => {
  response.body = users;
}

const getUserById = (
  { params, response } : { params: { id: string }; response: any; }, 
) => {
  const user:InterfaceUser | undefined = users.find((user) => user.id === params.id);

  if (user) {
    response.status = 200;
    response.body = user;
  } 
  else {
    response.status = 404;
    response.body = { message: 'User not found.' };
  }
};

const addUser = async ({ request, response } : { request: any; response: any; }) => {
  const body = await request.body();
  const user: InterfaceUser = body.value;
  
  user.created_at = new Date();
  user.updated_at = new Date();

  users.push(user);

  response.body = { message: 'Ok.' };
  response.status = 200;
};

const UpdateUser = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  let user: InterfaceUser | undefined = users.find((user) => user.id === params.id);

  if (user) {
    const body = await request.body();
    const updateUser: { name?: string; email?: string } = body.value;

    user = { ...user, ...updateUser , updated_at: new Date() };
    users = [...users.filter((user) => user.id !== params.id), user];

    response.status = 200;
    response.body = { message: 'Ok.' };
  }
  else {
    response.status = 404;
    response.body = { message: 'User not found.' };
  }
};

const deleteUserById = (
  { params, response }: { params: { id: string }; response: any },
) => {
  users = users.filter((user) => user.id !== params.id);

  response.body = { message: 'Ok.' };
  response.status = 200;
};

export { getUsers, getUserById, addUser, UpdateUser, deleteUserById };