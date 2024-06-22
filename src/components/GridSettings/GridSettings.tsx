import {
  Box,
  Button,
  Group,
  NativeSelect,
  NumberInput,
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
  const [numCategories, setNumCategories] = useState(puzzle.numCategories);
  const [numItems, setNumItems] = useState(puzzle.numItems);

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

  const handleNumCategoriesChange = (val: string | number) => {
    const newNumCategories = Number(val);
    setNumCategories(newNumCategories);
    if (newNumCategories > form.getValues().categories.length) {
      const newValues = form.getValues();
      newValues.categories.push({ name: "", items: [] });
      form.setValues(newValues);
    }
  };

  const handleOnSubmit = (values: { categories: Category[] }) => {
    // Trim from end of category and item arrays if numCategories/numItems now smaller than previous
    while (values.categories.length > numCategories) {
      values.categories.pop();
    }
    values.categories.forEach((category) => {
      while (category.items.length > numItems) {
        category.items.pop();
      }
    });
    puzzle.initCategories(values.categories);
    puzzle.createOuterGrid();
    props.setOuterGrid(puzzle.outerGrid);
  };

  const generateCategoryFields = () => {
    const catFields = [];
    for (let i = 0; i < numCategories; i++) {
      catFields.push(
        <TextInput
          key={form.key(`categories.${i}.name`)}
          {...form.getInputProps(`categories.${i}.name`)}
          className={classes.textInput}
        />
      );
    }
    return catFields;
  };

  const generateItemFields = () => {
    const itemFields = [];
    for (let i = 0; i < numItems; i++) {
      itemFields.push(
        <TextInput
          key={form.key(`categories.${itemCategory.index}.items.${i}`)}
          {...form.getInputProps(`categories.${itemCategory.index}.items.${i}`)}
          className={classes.textInput}
        />
      );
    }
    return itemFields;
  };

  const categoryFields = generateCategoryFields();

  const itemFields = (
    <>
      <NativeSelect
        value={itemCategory.name}
        onChange={handleItemCategoryChange}
        data={form.getValues().categories.map((cat) => cat.name)}
        className={classes.textInput}
      />
      {generateItemFields()}
    </>
  );

  return (
    <Box className={classes.settingsContainer}>
      <Group
        justify="space-between"
        align="flex-end"
        className={classes.topControls}
      >
        <SegmentedControl
          value={formState}
          onChange={setFormState}
          data={["categories", "items"]}
        />
        <Group>
          <NumberInput
            label={`# Cats`}
            min={2}
            clampBehavior="strict"
            value={numCategories}
            onChange={handleNumCategoriesChange}
            className={classes.numInput}
          />
          <NumberInput
            label={`# Items`}
            min={2}
            clampBehavior="strict"
            value={numItems}
            onChange={(val) => setNumItems(Number(val))}
            className={classes.numInput}
          />
        </Group>
      </Group>
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        {formState === "categories" ? categoryFields : itemFields}
        <Button type="submit" className={classes.submitButton}>
          Generate
        </Button>
      </form>
    </Box>
  );
};
