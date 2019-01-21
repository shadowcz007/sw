class Search {
    constructor(keyword) {
      this.keyword = this.save('keyword', keyword);
      this.backup = [];
      this.result=[];
      this.urls={}
    }
    save(_key, _val) {
      localStorage.setItem(_key, _val);
      return _val
    }
    get(_key) {
      return localStorage.getItem(_key);
    }
    set(_key, _val) {
      this[_key] = _val;
      this.save(_key, _val);
    }
    sort(_res) {
      var that = this;

      var result = [];
      for (let index = 0; index < _res.length; index++) {
        const r = _res[index];
        if (that.isAvailabe(r) == true) {
          if (that.isMatchKeyword(r.title)) {
            result.push(r);
          } else {
            that.backup.push(r);
          }
        }

      };

      that.todo(result);
      return result.length;
    }
    isMatchKeyword(_t) {
      let k = this.get('keyword');
      let isMatch = !!_t.match(k);
      console.log(isMatch, _t, k);

      return isMatch
    }
    isAvailabe(_r) {
      var c = _r.text ? _r.text.replace(/\s/ig, '') : '';
      var t = _r.title ? _r.title.replace(/\s/ig, '') : '';
      if (t.length > 0 && c.length > 0) {
        return true
      } else {
        return false
      }
    }
    done() {
      let rs = this.backup;
      this.todo(rs);
    }
    isNew(_url){
      var isN=this.urls[_url];
      if (!isN) {
        this.urls[_url]=1;
      };
      return !isN
    }
  }