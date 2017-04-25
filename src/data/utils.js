export const addIfUnique = (marray, value, field) => {
	let index = -999;
	if (value instanceof Array  && marray instanceof Array) {
		let tmpArr = [];
		value.map(
			( v ) => {
				index = marray.findIndex( (x) => x === v)
				if (index === -1 ) {
					tmpArr.push(v);				
				}
				return index;
			}
		)
		if (tmpArr.length >0) {
			marray.push(...tmpArr);
			index = -1;
		}	
		
	} else {
		
		if (field !== undefined) {
			index = marray.findIndex(
				(x) => {
					if (field in x){
						return x[field] === value[field]
					} else {
						return false;
					}
				}
			)
			if (index === -1 ) marray.push(value);
		}
	}
	return index === -1;
}


Array.prototype.unique = function(a){
	return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});