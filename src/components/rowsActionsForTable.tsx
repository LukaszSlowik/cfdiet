import { Product } from '@prisma/client'
import React from 'react'
import {Row} from "@tanstack/react-table";

type Props = {
    row:Row<Product>
}

export default function RowActions({row}: Props) {
  return (
    <div>rowsActionsForTable</div>
  )
}