const RestaurantDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // const restaurant = await getRestaurantById(id);
  return <div>RestaurantDetailPage {id}</div>;
};
export default RestaurantDetailPage;
