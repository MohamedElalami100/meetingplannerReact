interface ErrorOrEmptyStateProps {
  message: string
}

export default function ErrorOrEmptyState({ message }: ErrorOrEmptyStateProps) {
  return (
    <div className="text-center py-8">
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  )
}

