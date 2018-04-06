app.service('ServiceService', function($http){
  let _promise;
  const findAll = () => {
    if (_promise) return _promise;
    _promise = $http.get('/api/services')
      .then(res => res.data);
    return _promise;
  };
  return { findAll };
})
