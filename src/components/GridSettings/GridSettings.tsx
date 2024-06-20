import {
  Box,
  Button,
  NativeSelect,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { Puzzle } from "../../Puzzle/Puzzle";
import classes from "./GridSettings.module.css";
import { useForm } from "@mantine/form";
import React, { useState } from "react";

export const GridSettings = (props: {
  puzzle: Puzzle;
  setOuterGrid: React.Dispatch<React.SetStateAction<OuterGridRow[]>>;
}) => {
  const puzzle = props.puzzle;

  const [formState, setFormState] = useState("categories");
  const [itemCategory, setItemCategory] = useState({
    name: puzzle.gameState.categories[0].name,
    index: 0,
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      categories: puzzle.gameState.categories,
    },
  });

  const handleItemCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemCategory = {
      name: event.currentTarget.value,
      index: form
        .getValues()
        .categories.findIndex((cat) => cat.name === event.currentTarget.value),
    };
    setItemCategory(newItemCategory);
  };

  const handleOnSubmit = (values: { categories: Category[] }) => {
    puzzle.initCategories(values.categories);
    puzzle.createOuterGrid();
    props.setOuterGrid(puzzle.outerGrid);
  };

  const categoryFields = form
    .getValues()
    .categories.map((category, i) => (
      <TextInput
        placeholder={`${category.name}`}
        key={form.key(`categories.${i}.name`)}
        {...form.getInputProps(`categories.${i}.name`)}
      />
    ));

  const itemFields = (
    <>
      <NativeSelect
        value={itemCategory.name}
        onChange={handleItemCategoryChange}
        data={form.getValues().categories.map((cat) => cat.name)}
      />
      {form.getValues().categories[itemCategory.index].items.map((item, i) => (
        <TextInput
          placeholder={`${item}`}
          key={form.key(`categories.${itemCategory.index}.items.${i}`)}
          {...form.getInputProps(`categories.${itemCategory.index}.items.${i}`)}
        />
      ))}
    </>
  );

  return (
    <Box className={classes.settingsContainer}>
      <SegmentedControl
        value={formState}
        onChange={setFormState}
        data={["categories", "items"]}
      />
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        {formState === "categories" ? categoryFields : itemFields}
        <Button type="submit">Generate</Button>
      </form>
    </Box>
  );
};
