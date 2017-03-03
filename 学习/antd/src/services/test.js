import request from '../utils/request';

export function fetch(page) {
  return request(`/api/index/index?_c=api&_a=test&_page_=${page}&limit=5`);
}
export function create(values) {
  return request('/api/index/index?_c=api&_a=addTest', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
export function remove(id){
  return request('/api/index/index?_c=api&_a=deleteTest',{
    method:'POST',
    body:JSON.stringify(id),
  });
}
export function edit(id,values){
  return request(`/api/index/index?_c=api&_a=editTest&id=${id}`,{
    method:'POST',
    body:JSON.stringify(values),
  });
}
