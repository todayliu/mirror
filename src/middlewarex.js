
export default function middleware(subscriber) {

  if (typeof subscriber !== 'function') {
    throw new Error('Invalid hook, must be a function!')
  }
  return store => next=> action =>{
    return subscriber(action,store,next);
  }
}
