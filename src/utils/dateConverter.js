function useDateConverter() {
  //today
  const isToday = (userDate) => {
    const someDate = new Date(userDate);
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  //today
  const isMonth = (userDate) => {
    const someDate = new Date(userDate);

    const today = new Date();
    return (
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  return { isToday, isMonth };
}

export { useDateConverter };
