export const hideTab = (props) => {
  const parent = props && props.navigation && props.navigation.dangerouslyGetParent();
  parent &&
    parent.setOptions({
      tabBarVisible: false,
    });
};
export const showTab = (props) => {
  const parent = props && props.navigation && props.navigation.dangerouslyGetParent();
  parent &&
    parent.setOptions({
      tabBarVisible: true,
    });
};
