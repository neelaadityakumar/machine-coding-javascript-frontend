import VsCodePanel from "./VsCodePanel";

function App() {
  const dataSet = [
    {
      id: 1,
      name: "Men",
      children: [],
    },
    {
      id: 2,
      name: "Women",
      children: [
        {
          id: 1,
          name: "Item 1",
          children: [
            {
              id: 1,
              name: "Dress",
              children: [],
            },
            {
              id: 2,
              name: "Shoes",
              children: [],
            },
            {
              id: 3,
              name: "Toys",
              children: [
                {
                  id: 1,
                  name: "Toy 1",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Item 2",
          children: [
            {
              id: 1,
              name: "Folder 1",
              children: [],
            },
            {
              id: 2,
              name: "Folder 2",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Child",
      children: [
        {
          id: 1,
          name: "Item 2",
          children: [
            {
              id: 1,
              name: "Kurtis",
              children: [],
            },
            {
              id: 2,
              name: "Frocks",
              children: [],
            },
            {
              id: 3,
              name: "Shoes",
              children: [],
            },
          ],
        },
      ],
    },
  ];

  return <VsCodePanel dataSet={dataSet} />;
}

export default App;
