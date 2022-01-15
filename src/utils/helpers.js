export const calcTime = time => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`
}

export const convertMoney = money => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });

    return formatter.format(money);
}

export const getLocation = () => {
    const { pathname, hash, search } = window.location;
  
    // We recreate our own object 
    // because window.location is mutated
    return {
      pathname,
      hash,
      search,
    };
  }
  